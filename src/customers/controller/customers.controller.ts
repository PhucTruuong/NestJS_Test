import { 
    Controller, 
    Get, 
    Param, 
    Body, 
    Post, 
    Patch,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CustomerPaginationDto, CustomerModifiedDto } from 'src/database/DTO/customer.dto';
import { StandardParam, StandardParams, StandardResponse } from 'nest-standard-response';
import { 
    InternalServerErrorException,
    HttpException,
    NotFoundException
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('/')
export class CustomersController {
    constructor(private readonly customerServices: CustomersService) { }

    @Get('/all-customers')
    async findAll() {
        const allCustomers = await this.customerServices.findAll();
        if (allCustomers instanceof InternalServerErrorException || 
            allCustomers instanceof HttpException
        ) {
            return allCustomers as HttpException | InternalServerErrorException;
        }
        return allCustomers;
    };

    @Get('/:id')
    async findById(@Param('id') id: number) {
        return await this.customerServices.findById(id);
    };

    @Post('/all-customers-paginated')
    @StandardResponse({
        isPaginated: true,
    })
    async findAllPaginated(
        @Body() input: CustomerPaginationDto,
        @StandardParam() standardParam: StandardParams
    ) {
        const response = await this.customerServices.findAllPaginated(input);

        if (response instanceof InternalServerErrorException || response instanceof HttpException) {
            return response;
        } else {
            const { data, totalCount } = response;
            standardParam.setPaginationInfo({ count: totalCount });
            return data;
        };
    };

    @UsePipes(new ValidationPipe({ 
        transform: true,
        skipMissingProperties: true
    }))
    @ApiBody({ type: CustomerModifiedDto })
    @Patch('/customer-modified')
    async updateCustomer(@Body() customer: CustomerModifiedDto) {
        const customerGetUpdate = await this.customerServices.update(customer);
        if (customerGetUpdate instanceof InternalServerErrorException || 
            customerGetUpdate instanceof NotFoundException
        ) {
            return customerGetUpdate;
        };

        if(customerGetUpdate === true) {
            return {
                message: "Customer updated successfully",
            };
        };
    };
};
