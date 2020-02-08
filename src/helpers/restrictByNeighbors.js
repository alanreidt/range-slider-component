import { restrictNumberByNeighbors } from "../utilities";

/**
 * A wrapper on restrictNumberByNeighbors utility function
 */
export function restrictByNeighbors(prevNeighbor, nextNeighbor) {
  return (number) =>
    restrictNumberByNeighbors(number, prevNeighbor, nextNeighbor);
}
