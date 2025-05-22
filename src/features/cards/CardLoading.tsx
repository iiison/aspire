import { LogoSm } from '../../components/icons';

const CardLoading = () => {
  return (
    <section className="p-8 rounded-2xl shadow-md text-white transition-all duration-300 w-[415px] h-[250px] bg-slate-400 animate-pulse">
      <div className="w-full flex mb-5">
        <LogoSm className="h-[20px] w-[66px] fill-white ml-auto" />
      </div>
      <header className="flex mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider border-gray-400 w-52"></h2>
      </header>

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold tracking-wider">
          •••• •••• •••• ••••
        </div>
      </div>

      <footer className="flex font-bold items-center text-sm">
        <div className="tracking-wide mr-9 text-white">•••• ••••</div>
        <div className="tracking-wide mr-9 text-white">•••• ••••</div>
      </footer>
      <div className="w-full flex"></div>
    </section>
  );
};

export default CardLoading;
