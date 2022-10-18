import fs from 'fs/promises';
import path from 'path';
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
}

export async function getStaticProps() {
  console.log('re-generating..');
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
