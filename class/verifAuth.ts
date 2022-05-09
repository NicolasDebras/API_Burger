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
                return 0;
                break;
            case "admin":
                if (roleCreateUser == "admin"){
                    return 1;
                }else{
                    return 0;
                }
                break;
        }
        return 1;
    }
}
