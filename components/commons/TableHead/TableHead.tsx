interface PropTypes {
  name?: string;
}

const TableHead = (props: PropTypes) => {
  const { name = "PandanSembilan" } = props;

  return (
    <div>
      <h1 className="text-foreground/80 -mb-10 flex items-center justify-center pt-6 text-3xl font-bold">
        {name}
      </h1>
    </div>
  );
};

export default TableHead;
