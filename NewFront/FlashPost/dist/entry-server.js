import { createApp } from './main';

export async function createPageRender() {
  const { app, router } = await createApp();

  // Wait until the router is ready before rendering
  await router.isReady();

  return (url) => {
    router.push(url);

    return new Promise((resolve, reject) => {
      router.onReady(() => {
        const matchedComponents = router.currentRoute.value.matched.map(
          (record) => record.components.default
        );

        if (!matchedComponents.length) {
          return reject({ code: 404 });
        }

        resolve(app);
      }, reject);
    });
  };
}
