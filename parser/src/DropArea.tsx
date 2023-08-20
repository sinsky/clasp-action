import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconX, IconFileCode } from "@tabler/icons-react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";

export default function DropArea(
  props: Partial<DropzoneProps> & { setClaspJsonValue: (value: string | React.ChangeEvent<HTMLInputElement> | null | undefined) => void }
) {
  const { setClaspJsonValue } = props;
  const theme = useMantineTheme();
  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setClaspJsonValue(reader.result as string);
      }
    };
    reader.readAsText(file);
  };
  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={{
        "application/json": [".json"],
      }}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(110), pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload size="3.2rem" stroke={1.5} color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="3.2rem" stroke={1.5} color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileCode size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag the .clasprc.json file here or click to select the file.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
