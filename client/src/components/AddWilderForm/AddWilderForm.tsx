import { FormEvent, useState } from "react";
import style from "./AddWilderForm.module.css";
import IWilder from "../../interface/IWilder";
import { useWilders } from "../../contexts/WilderContext";
import { gql, useMutation } from "@apollo/client";

const ADD_WILDER = gql`
  mutation AddWilder($city: String!, $name: String!) {
    addWilder(city: $city, name: $name) {
      name
      city
      id
    }
  }
`;

const AddWilderForm: React.FC = () => {
  const { fetchData } = useWilders();
  const [name, setName] = useState<IWilder["name"]>("");
  const [city, setCity] = useState<IWilder["city"]>("");
  const [addWilder, { loading }] = useMutation(ADD_WILDER);

  const sendWilder = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await addWilder({
        variables: { name, city },
      });
      void fetchData();
      setName("");
      setCity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add new Wilder</h2>
      <form
        className={style.form}
        id="addWilderForm"
        onSubmit={(e) => {
          void sendWilder(e);
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="René Girard"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          placeholder="Paris"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddWilderForm;
