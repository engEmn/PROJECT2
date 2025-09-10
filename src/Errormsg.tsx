interface IProps{
  msg:string
}

const Errormsg = ({ msg }: IProps) => {
  return msg ? (
    <span className="block text-red-700 font-semibold text-sm">{msg}</span>
  ) : null;
};

export default Errormsg;