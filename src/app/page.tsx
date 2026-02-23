import { DesktopShell } from "../components/shell/DesktopShell";
import { ContentMap, fetchAllContent } from "../lib/content";
import { ContentProvider } from "../state/ContentContext";

export default function Home() {
  const contentMap: ContentMap = fetchAllContent();
  return (
    <>
      <ContentProvider initialContent={contentMap}>
        <DesktopShell />
      </ContentProvider>
    </>
  );
}
