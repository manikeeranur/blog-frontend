import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
} from "lucide-react";

const HeadingSelector = ({ editor }: any) => {
  if (!editor) return null;

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) return `h${i}`;
    }
    return editor.isActive("paragraph") ? "p" : "p";
  };

  const current = getCurrentHeading();

  const onChange = (value: any) => {
    editor.chain().focus();

    if (value === "p") {
      editor.setParagraph().run();
    } else {
      const level = parseInt(value.replace("h", ""), 10);
      editor.toggleHeading({ level }).run();
    }
  };

  const headingOptions = [
    {
      label: "Paragraph",
      value: "paragraph",
      icon: <Pilcrow className="w-4 h-4" />,
    },
    { label: "Heading 1", value: "1", icon: <Heading1 className="w-4 h-4" /> },
    { label: "Heading 2", value: "2", icon: <Heading2 className="w-4 h-4" /> },
    { label: "Heading 3", value: "3", icon: <Heading3 className="w-4 h-4" /> },
    { label: "Heading 4", value: "4", icon: <Heading4 className="w-4 h-4" /> },
    { label: "Heading 5", value: "5", icon: <Heading5 className="w-4 h-4" /> },
    { label: "Heading 6", value: "6", icon: <Heading6 className="w-4 h-4" /> },
  ];

  return (
    <Select
      value=""
      onValueChange={(value) => {
        if (!editor) return;

        if (value === "paragraph") {
          editor.chain().focus().setParagraph().run();
        } else {
          editor
            .chain()
            .focus()
            .toggleHeading({ level: Number(value) })
            .run();
        }
      }}
    >
      <SelectTrigger className="w-[140px] !bg-[#fff] !outline-none">
        Heading
      </SelectTrigger>
      <SelectContent>
        {headingOptions?.map((data: any, index: any) => (
          <SelectItem key={index} value={data?.value}>
            <span className="flex gap-2">
              {data?.icon}
              {data?.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default HeadingSelector;
