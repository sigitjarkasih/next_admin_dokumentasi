import StarRateIcon from '@mui/icons-material/StarRate';

const RateStar = ({value, fontSize, ...props}) => {
    return (
        <div>
            {[...Array(5)].map((x, i) =>
                <StarRateIcon 
                    key={i}
                    fontSize={fontSize} 
                    style={{color: (i+1 <= value ? 'orange' : '#E5E5E5')}}                     
                    {...props}
                />
            )} 
        </div>
    )
}

export default RateStar;