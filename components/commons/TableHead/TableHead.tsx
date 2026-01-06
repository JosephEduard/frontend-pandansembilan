interface PropTypes {
  name?: string;
}

const TableHead = (props: PropTypes) => {
  const { name } = props;

  return (
    <div>
      <h1 className="text-foreground/80 -mb-10 flex items-center justify-center pt-6 text-3xl font-bold max-sm:text-center max-sm:text-xl">
        {name}
      </h1>
    </div>
  );
};

export default TableHead;
