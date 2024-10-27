interface CardProps {
  title: string;
  children: React.ReactNode;
  customClass?: string;
}

const Card = ({title, children, customClass}: CardProps) => {
  return (
    <div className={`card bg-slate-800 flex-1 p-4 border border-slate-500 ${customClass}`}>
      <h3 className="text-center text-xl text-white font-bold helvetica">{title}</h3>
      <div className="border-b border-slate-500 mb-4" />
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export default Card
