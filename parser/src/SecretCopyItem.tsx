import { SimpleGrid, CopyButton, Text, Button } from "@mantine/core";

export default function SecretCopyArea({ name, value }: { name: string; value: string }) {
  return (
    <SimpleGrid style={{ gap: "0", margin: ".5rem 0" }}>
      <Text>{name}</Text>
      <SimpleGrid cols={2}>
        <CopyButton value={name}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              Name {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
        {value === "" || value === undefined ? (
          <Button disabled>Valid Secret Value</Button>
        ) : (
          <CopyButton value={value}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                Secret {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CopyButton>
        )}
      </SimpleGrid>
    </SimpleGrid>
  );
}
