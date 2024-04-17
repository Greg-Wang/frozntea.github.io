interface Props {
  image: string;
}

function RankedLogo({ image }: Props) {
  return (
    <>
      <img className="centerLogo" src={image}></img>
    </>
  );
}

export default RankedLogo;
