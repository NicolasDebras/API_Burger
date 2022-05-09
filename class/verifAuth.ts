export class verifAuth {

    public static  async  verifCreate(roleUser: string, roleCreateUser: string ): Promise<number>{
        if (roleCreateUser==="customer"){
            return 0;
        }
        if (roleCreateUser==="bigBoss"){
            return 0;
        }
        switch (roleUser){
            case "bigBoss":
                if ("customer" == roleCreateUser || "preparateur" == roleCreateUser || "admin" == roleCreateUser){
                    return 0;
                }
                break;
            case "admin":
                if ("customer" == roleCreateUser || "preparateur" == roleCreateUser){
                    return 0;
                }
                break;
        }
        return 1;
    }
}
