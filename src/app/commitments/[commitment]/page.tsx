type Props = {
  params: {
    commitment: string;
  };
};

export default async function CommitmentPage({ params }: Props) {
  return <>{params.commitment}</>;
}
