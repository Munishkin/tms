import recordsService from "../services/recordsService";
import BaseController from "./baseController";

class RecordsController extends BaseController {
    constructor() {
        super({
            service: recordsService
        });
    }
}

export default new RecordsController();
