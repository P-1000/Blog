import React from 'react';
import Output from 'editorjs-react-renderer';
import DOMPurify from 'dompurify';

const EditorjsRender = (props) => {
    const { data } = props;

    const renderBlock = (block) => {
        switch (block.type) {
            case 'header':
                return <h2 className='text-2xl font-bold mb-4'>{block.data.text}</h2>;
            case 'paragraph':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
            case 'list':
                return (
                    <ul className='list-disc ml-6 mb-4'>
                        {block.data.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                );
            case 'image':
                return (
                    <div className='my-4'>
                        <img className='max-w-full' src={block.data.file.url} alt={block.data.caption} />
                        <p className='text-center text-sm italic mt-2'>{block.data.caption}</p>
                    </div>
                );
            case 'code':
                return (
                    <pre className='bg-gray-200 p-4 rounded-md my-4'>
                        <code>{block.data.code}</code>
                    </pre>
                );
            case 'newParagraph': // Case for a new paragraph
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
            case 'orderedList': // Case for ordered list
                return (
                    <ol className='list-decimal ml-6 mb-4'>
                        {block.data.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                );
            case 'unorderedList': // Case for unordered list
                return (
                    <ul className='list-disc ml-6 mb-4'>
                        {block.data.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                );
//cases for table : 
         case 'table':
                return (
                    <table className='table-auto border-collapse border border-gray-400'>
                        <thead>
                            <tr>
                                {block.data.content[0].map((item, index) => (
                                    <th key={index} className='border border-gray-400 px-4 py-2'>
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.data.content.slice(1).map((row, index) => (
                                <tr key={index}>
                                    {row.map((item, index) => (
                                        <td key={index} className='border border-gray-400 px-4 py-2'>
                                            {item}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

                // case for bold 
                case 'bold':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                // case for italic
                case 'italic':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                // case for underline
                case 'underline':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                // case for link
                case 'linkTool':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                // case for quote
                case 'quote':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                // case for warning
                case 'warning':
                return <p className='mb-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.data.text) }} />;
                

                         // todo cases : 

            default:
                return null;
        }
    };

    return (
        <div className='bg-white p-6 px-36'>
            {data.blocks.map((item, index) => (
                <div key={index} className='my-3'>
                    {renderBlock(item)}
                </div>
            ))}
        </div>
    );
};

export default EditorjsRender;
