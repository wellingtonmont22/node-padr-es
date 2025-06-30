class ApiResponse {
    status: number;
    message: string;
    data?: any;
}

class ApiResponseBuilder {
    private response = new ApiResponse();

    withStatus(status: number): this {
        this.response.status = status;
        return this;
     }

     withMessage(message: string): this {
        this.response.message = message;
        return this;
     }

     withData(data: any): this {
        this.response.data = data;
        return this;
     }

    build(): ApiResponse {
        return this.response;
    }
}

const response = new ApiResponseBuilder()
    .withStatus(200)
    .withMessage("Success")
    .withData({ id: 1, name: "John Doe" })
    .build();

console.log(response);