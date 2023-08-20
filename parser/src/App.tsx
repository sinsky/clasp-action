import { Container, SimpleGrid, CopyButton, JsonInput, Text, Highlight, Button, Title } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { Prism } from "@mantine/prism";
import { useMemo } from "react";

const actionsStep = `- uses: daikikatsuragawa/clasp-action@v1.1.0
  with:
    accessToken: \${{ secrets.ACCESS_TOKEN }}
    idToken: \${{ secrets.ID_TOKEN }}
    refreshToken: \${{ secrets.REFRESH_TOKEN }}
    clientId: \${{ secrets.CLIENT_ID }}
    clientSecret: \${{ secrets.CLIENT_SECRET }}
    scriptId: \${{ secrets.SCRIPT_ID }}
    # Your Select Commands
    command: 'push|deploy'
    # push option
    rootDir: 'src'
    # deploy option
    description: ''
    deployId: \${{ secrets.DEPLOY_ID }}`;

export default function App() {
  const [claspJsonValue, setClaspJsonValue] = useInputState<string>("");
  const secrets = useMemo(() => {
    try {
      const data = JSON.parse(claspJsonValue);
      const { token, oauth2ClientSettings } = data;
      const { access_token, id_token, refresh_token } = token;
      const { clientId, clientSecret } = oauth2ClientSettings;
      return {
        ACCESS_TOKEN: access_token,
        ID_TOKEN: id_token,
        REFRESH_TOKEN: refresh_token,
        CLIENT_ID: clientId,
        CLIENT_SECRET: clientSecret,
      };
    } catch (e) {
      console.warn(e);
      return null;
    }
  }, [claspJsonValue]);

  return (
    <Container my="md">
      <Title order={1}>Clasp Action Parser</Title>
      <SimpleGrid cols={2} spacing={"md"} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <JsonInput
          placeholder="Please input your .clasprc.json"
          label="clasprc.json data"
          validationError="Invalid JSON"
          minRows={20}
          description={<Text>Please paste your .clasprc.json or file drop here</Text>}
          value={claspJsonValue}
          onChange={setClaspJsonValue}
          autosize
        />
        <div>
          <Text>Parse JSON to GitHub Actions yaml</Text>
          <Prism language="yaml">{actionsStep}</Prism>
          <SecretCopyArea name={"ACCESS_TOKEN"} value={secrets?.ACCESS_TOKEN} />
          <SecretCopyArea name={"ID_TOKEN"} value={secrets?.ID_TOKEN} />
          <SecretCopyArea name={"REFRESH_TOKEN"} value={secrets?.REFRESH_TOKEN} />
          <SecretCopyArea name={"CLIENT_ID"} value={secrets?.CLIENT_ID} />
          <SecretCopyArea name={"CLIENT_SECRET"} value={secrets?.CLIENT_SECRET} />
          <Text style={{ borderLeft: "4px solid skyblue", paddingLeft: ".5rem", margin: ".5rem 0" }}>
            <Highlight highlight={"SCRIPT_ID"}>Please create "SCRIPT_ID"</Highlight>
          </Text>
          <SimpleGrid cols={2}>
            <CopyButton value={"SCRIPT_ID"}>
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy}>
                  ID {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </CopyButton>
          </SimpleGrid>
        </div>
      </SimpleGrid>
    </Container>
  );
}

const SecretCopyArea = ({ name, value }: { name: string; value: string }) => {
  return (
    <SimpleGrid style={{ gap: "0", margin: ".5rem 0" }}>
      <Text>{name}</Text>
      <SimpleGrid cols={2}>
        <CopyButton value={name}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              ID {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
        {value === "" || value === undefined ? (
          <Button disabled>Valid Value</Button>
        ) : (
          <CopyButton value={value}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                Value {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CopyButton>
        )}
      </SimpleGrid>
    </SimpleGrid>
  );
};
