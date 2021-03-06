import dp from "../images/dp1.jpg";

const User = ({
  photo,
  name,
  classname,
  wrapperclass,
  insidewrapclass,
  onclick,
  id,
}) => {
  return (
    <div className={classname} onClick={onclick}>
      <div className={wrapperclass}>
        <div className={insidewrapclass} id={id}>
          <img src={photo ? photo : dp} />
          <h4 style={{ color: "black" }}>{name}</h4>
        </div>
      </div>
    </div>
  );
};

export default User;
