"use client";

import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { Link as LinkExtension } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import ts from "highlight.js/lib/languages/typescript";
import js from "highlight.js/lib/languages/javascript";
import Toolbar from "./Toolbar";

type TipTapProps = {
  description: string;
  onChange: (richText: string) => void;
};

const lowlight = createLowlight(all);
lowlight.register("ts", ts);
lowlight.register("ts", js);

const TipTap = (props: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-neutral-800 dark:border-dark-700 border border-gray-300 dark:text-white p-1 rounded-md",
          },
        },
        codeBlock: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-16 pb-4 first:p-0 [&_li>p]:mb-[20px]",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "ml-16 list-decimal pb-4 first:p-0 [&_li>p]:mb-[20px]",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "px-[16px] py-6 mb-[30px] mt-[10px] bg-indigo-50 dark:bg-dark-800 text-dark-300 rounded-sm [&>*]:m-0",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class:
              "text-sm md:text-base leading-relaxed text-dark-800 dark:text-dark-300 mt-[10px] mb-[30px] [&_a]:underline underline-offset-2 [&_a]:text-blue-700 dark:[&_a]:text-blue-500",
          },
        },
      }),
      Heading.extend({
        levels: [1, 2, 3, 4],
        // eslint-disable-next-line
        renderHTML({ node, HTMLAttributes }: any) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: "text-4xl font-medium lg:text-6xl md:font-semibold mb-4 text-dark-800 dark:text-dark-300",
            2: "text-2xl font-medium lg:text-4xl md:font-semibold mb-4 text-dark-800 dark:text-dark-300",
            3: "text-xl font-medium lg:text-3xl md:font-semibold mb-4 text-dark-800 dark:text-dark-300",
            4: "text-2xl font-medium md:font-semibold mb-4 text-dark-800 dark:text-dark-300",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2, 3, 4] }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
      }),
      LinkExtension.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
        HTMLAttributes: {
          class: "code-block",
        },
      }),
    ],
    // content: props.description,
    editorProps: {
      attributes: {
        class:
          "border border-input rounded-lg min-h-[200px] focus:outline-none p-4",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
      // console.log(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
