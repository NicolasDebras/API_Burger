
export class delivery {


    public static calcul(CordRest : [number, number], CordDeliveryMan : [number, number][]) : number {

        let res = -1;
        let index = -1;
        for (let i= 0; i < CordDeliveryMan.length; i++)
        {
            let calcul = Math.acos(Math.sin(CordRest[0])*Math.sin(CordDeliveryMan[i][0]) + 
            Math.cos(CordRest[0])*Math.cos(CordDeliveryMan[i][0])* Math.cos(CordRest[1]-CordDeliveryMan[i][1]))
            calcul = calcul * 6371; // rayon de la terre 
            console.log(calcul.toString());
            if (res < calcul ) {
                res = calcul;
                index = i;
            }

        }
        return index;
        
    }
}