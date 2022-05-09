export class verifAuth {

    public static  async  verifCreate(roleUser: string, roleCreateUser: string ): Promise<number>{
        if (roleCreateUser==="customer"){
            return 0;
        }
        switch (roleUser){
            case "bigBoss":
                if ("Customer" == roleCreateUser || "Preparateur" == roleCreateUser || "admin" == roleCreateUser){
                    return 0;
                }
                break;
            case "admin":
                if ("Customer" == roleCreateUser || "Preparateur" == roleCreateUser){
                    return 0;
                }
                break;
        }
        return 1;
    }
}
