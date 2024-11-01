const cards = async ({ data }) => {
  return (
    <>
      <div className="bg-color-tertiary flex flex-col items-center">
        <h3 className="text-xl font-bold">{data.name}</h3>
        <p>{data.description}</p>
      </div>
    </>
  );
};

export default cards;
