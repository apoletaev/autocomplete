
export const dataNormalize = (data: any[], country: string) => {
    // also cleans api mistakes and non-relevant data
    return data?.reduce((acc, curValue)=>{
        if(curValue?.name?.common?.toLowerCase().includes(country.toLowerCase())){
          acc.push(curValue.name.common);
        }

        return acc;
    }, []);
}
