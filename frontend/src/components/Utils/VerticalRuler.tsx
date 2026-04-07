type VerticalRulerProps = {
    color?: string; 
}

const VerticalRuler = ({color}: VerticalRulerProps) => {
    return (
        <div className="vertical-ruler" style={{margin: "0 10px 0 10px", padding: "3px 0 3px 0", borderLeft: `1px dashed ${color ?? "#10111E"}`}}></div>
    )
}

export default VerticalRuler