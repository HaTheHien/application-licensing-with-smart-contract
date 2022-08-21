export default function Screen(props) {
  return (
    <div className="min-h-[160px] bg-gray-200 flex w-full items-center px-2 py-0">
      <p className="font-mono text-4xl h-full break-all text-end w-full">
        {props.result}
      </p>
    </div>
  );
}
