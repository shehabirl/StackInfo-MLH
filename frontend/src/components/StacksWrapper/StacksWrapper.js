import StackIcon from '../StackIcon/StackIcon';

const StacksWrapper = (props) => {
    function mapStackIcons(stacks) {
        if ((typeof stacks !== 'undefined' && (stacks=="" ||stacks===" ") )) {
            return (
                <div>
                    <span title={"we don't know"} aria-label="unknown man so far" role="img">🤷‍♂️</span>
                    <span title={"we don't know"} aria-label="unknown woman so far" role="img">🤷‍♀️</span>
                </div>)
        }
        else {
            let stackIconSize = stacks.length < 7 ? 3 : 2.7;
            return stacks.map((stackIcon) => {
                return (
                    <StackIcon key={stackIcon} stack={stackIcon} iconSize={stackIconSize}></StackIcon>
                )
            });
        }
    }
    return (
        <div>
            <h6>{props.stackWrapperTitle}</h6>
            <div className="p-1">
                {
                    mapStackIcons(props.stackList)
                }
            </div>
        </div>
    )

}
export default StacksWrapper;