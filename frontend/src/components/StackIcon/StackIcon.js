import { StacksCSSMap } from "../../utils/StackConstants";


const StackIcon = (props) => {
    return (
        <i key={props.stack} title={props.stack} style={{ fontSize: `${props.iconSize}rem` }} className={`devicon-${StacksCSSMap.get(props.stack)} stack-icon`}></i>
    )
};

export default StackIcon;
