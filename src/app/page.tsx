import DocumentationButton from "./components/DocumentationButton";
import GitHubSignIn from "./components/GitHubSignIn";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12">
      <div className="text-8xl font-fredoka font-bold text-center px-12 leading-none tracking-tight relative z-10">
        Fixing the form creation and monitoring process
      </div>
      <div className="flex items-center justify-center gap-8 relative z-10">
        <DocumentationButton />
        <GitHubSignIn size={1} />
      </div>
    </div>
  );
}
