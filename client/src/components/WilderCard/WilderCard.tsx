import blank_profile from "../../assets/blank_profile.png";
import "./WilderCard.css";
import IWilder from "../../interface/IWilder";
import { useWilders } from "../../contexts/WilderContext";
import { useMutation, gql } from "@apollo/client";

const DELETE_WILDER = gql`
  mutation DeleteWilder($deleteWilderId: Float!) {
    deleteWilder(id: $deleteWilderId)
  }
`;

interface WilderData {
  wilder: IWilder;
}

const WilderCard: React.FC<WilderData> = ({ wilder }: WilderData) => {
  const { fetchData } = useWilders();
  const [deleteWilder] = useMutation(DELETE_WILDER);

  const btnDelete = async () => {
    await deleteWilder({
      variables: { deleteWilderId: wilder.id },
    });
    fetchData();
  };

  return (
    <article className="card">
      <img
        draggable="false"
        src={blank_profile}
        alt={`${wilder.name} Profile`}
      />
      <h3>{wilder.name}</h3>
      <h4>{wilder.city}</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {wilder.skills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
      <h4>Actions</h4>
      <button
        title={`Delete ${wilder.name}`}
        className="btn"
        onClick={() => {
          void btnDelete();
        }}
      >
        Delete
      </button>
    </article>
  );
};

export default WilderCard;
