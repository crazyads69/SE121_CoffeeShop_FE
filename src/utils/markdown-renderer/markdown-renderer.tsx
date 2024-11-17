/* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react/no-unstable-nested-components */
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import remarkBreaks from "remark-breaks";
// import rehypeRaw from "rehype-raw";

// function MarkdownRenderer({ content }: { content: string }) {
//     return (
//         <div className="markdown-content overflow-x-auto">
//             <ReactMarkdown
//                 remarkPlugins={[remarkGfm, remarkBreaks]}
//                 rehypePlugins={[rehypeRaw]}
//                 components={{
//                     table: ({ children }) => (
//                         <div className="overflow-x-auto w-full">
//                             <table className="min-w-full border-collapse border border-gray-300">
//                                 {children}
//                             </table>
//                         </div>
//                     ),
//                     thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
//                     tbody: ({ children }) => <tbody>{children}</tbody>,
//                     tr: ({ children }) => <tr>{children}</tr>,
//                     th: ({ children }) => (
//                         <th className="border border-gray-300 px-4 py-2 text-left">{children}</th>
//                     ),
//                     td: ({ children }) => (
//                         <td className="border border-gray-300 px-4 py-2">{children}</td>
//                     ),
//                     // Add styling for other markdown elements
//                     p: ({ children }) => <p className="mb-4">{children}</p>,
//                     ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
//                     ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
//                     li: ({ children }) => <li className="mb-1">{children}</li>,
//                     h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
//                     h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
//                     h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
//                     blockquote: ({ children }) => (
//                         <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
//                             {children}
//                         </blockquote>
//                     ),
//                     code: ({ node, className, children, ...props }) => {
//                         if (className === "inline") {
//                             return (
//                                 <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">
//                                     {children}
//                                 </code>
//                             );
//                         }
//                         return (
//                             <pre className="bg-gray-100 rounded p-4 overflow-x-auto">
//                                 <code className={className}>{children}</code>
//                             </pre>
//                         );
//                     },
//                 }}
//             >
//                 {content}
//             </ReactMarkdown>
//         </div>
//     );
// }

// export default MarkdownRenderer;

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="markdown-content overflow-x-auto text-sm sm:text-base">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    table: ({ children }) => (
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full border-collapse border border-gray-300">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr>{children}</tr>,
                    th: ({ children }) => (
                        <th className="border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                            {children}
                        </td>
                    ),
                    p: ({ children }) => <p className="mb-3 sm:mb-4">{children}</p>,
                    ul: ({ children }) => (
                        <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4">{children}</ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    h1: ({ children }) => (
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-sm sm:text-base md:text-lg font-bold mb-2">
                            {children}
                        </h4>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-3 sm:pl-4 italic my-3 sm:my-4 text-sm sm:text-base">
                            {children}
                        </blockquote>
                    ),
                    code: ({ node, className, children }) => {
                        if (className === "inline") {
                            return (
                                <code className="bg-gray-100 rounded px-1 py-0.5 text-xs sm:text-sm">
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <pre className="bg-gray-100 rounded p-2 sm:p-4 overflow-x-auto text-xs sm:text-sm">
                                <code className={className}>{children}</code>
                            </pre>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownRenderer;
