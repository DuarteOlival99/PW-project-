package com.ulht.pw.dto.productsale;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ulht.pw.dto.BaseDTO;
import com.ulht.pw.dto.product.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ProductSaleDTO extends BaseDTO {
	private static final long serialVersionUID = 1L;

	private int quantitySold;
	private double price;
	private int taxAmount;
	private LocalDate saleDate;
	private List<ProductDTO> products= new ArrayList<>();
	
	
}
