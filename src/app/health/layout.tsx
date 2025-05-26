import Today from "@/features/health/Today";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Today />
      {children}
    </div>
  );
}
