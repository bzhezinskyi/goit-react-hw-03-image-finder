import { Bars } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="loader">
      <Bars
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
