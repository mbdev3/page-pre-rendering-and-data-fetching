import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => {
        return (
          <li key={item.id}>
            <Link href={`/${item.id}`}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('re-generating..');
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }
  if (data.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
