
export const dataNormalize = (data: any[], country: string) => {
    // also cleans api non-relevant data
    return data.filter((item: { name: { common: string; }; }) => item?.name?.common?.toLowerCase().includes(country))
        .map((i:{ name: { common: string; };}) => i?.name?.common);
}
