import Button from '../common/Button';

export default function ItemDisplayBlock({onClose}) {
  return <>
  <p>BLOCK</p>
  <Button onClick={onClose}>Close</Button>
  </>;
}