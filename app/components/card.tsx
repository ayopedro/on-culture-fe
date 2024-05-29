const Card = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className='bg-white rounded-md p-5'>{children}</div>;
};

export default Card;
