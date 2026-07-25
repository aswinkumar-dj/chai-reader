export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          The Echo of our{" "}
          <span
            style={{
              backgroundImage: "var(--accent-gradient)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Silent Pages
          </span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Chai Reader scaffold is up and tokens are working.
        </p>
      </div>
    </main>
  );
}