import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ChoiceCard = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Button className='btn-primary'>Vai</Button>
      </Card.Body>
    </Card>
  );
};

export default ChoiceCard;
