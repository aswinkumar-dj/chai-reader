interface ProductDetailRowProps {
  label: string;
  value: string;
}

export function ProductDetailRow({ label, value }: ProductDetailRowProps) {
  return (
    <div className="flex gap-2 text-sm">
      <dt className="font-medium text-foreground">{label} :</dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}