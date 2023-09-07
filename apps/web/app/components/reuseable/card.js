import { Tile } from "@carbon/react";

const Card = ({title, description, dark}) => {
    return ( 
        <Tile className={`tile ${dark === true && 'darktile'}`}>
          <h2 className="heading6">
            {title}
          </h2>
          <p className="paragraph2">
            {description}
          </p>
        </Tile>
     );
}
 
export default Card;