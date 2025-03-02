export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    registerUser = async (req, res, next) => {
        try {
            const response = await this.userService.registerUser(req.body);
            console.log(response);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    loginUser = async (req, res, next) => {
        try {
            const response = await this.userService.loginUser(req.body);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
