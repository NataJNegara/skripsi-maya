const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="">
      <p className="dashboard-title mb-16">Perbarui postingan</p>
      <p>{slug}</p>
    </div>
  );
};

export default Page;
