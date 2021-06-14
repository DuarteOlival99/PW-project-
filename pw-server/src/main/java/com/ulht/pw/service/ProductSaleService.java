package com.ulht.pw.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ulht.pw.controller.rest.errors.ResourceNotFoundException;
import com.ulht.pw.domain.ProductSaleEntity;
import com.ulht.pw.dto.productsale.ProductSaleDTO;
import com.ulht.pw.repository.ProductSaleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import ma.glasnost.orika.MapperFacade;

@Log4j2
@Service
@RequiredArgsConstructor
public class ProductSaleService {

	private static final String DOMAIN_NAME = "ProductSaleEntity";

	private final ProductSaleRepository productSaleRepository;

	private final MapperFacade mapper;

	public ProductSaleDTO searchProductSaleById(Long productSaleId) {
		ProductSaleEntity productSale = productSaleRepository.findById(productSaleId)
				.orElseThrow(() -> new ResourceNotFoundException(DOMAIN_NAME, "id", productSaleId));
		return mapper.map(productSale, ProductSaleDTO.class);
	}

	public List<ProductSaleDTO> findAllProductSales() {
		return mapper.mapAsList(productSaleRepository.findAll(), ProductSaleDTO.class);
	}

	@Transactional
	public ProductSaleDTO createProductSale(ProductSaleDTO productSale) {
		ProductSaleEntity productSaleEntity = handleProductSaleSave(productSale);
		return mapper.map(productSaleRepository.save(productSaleEntity), ProductSaleDTO.class);
	}

	@Transactional
	public ProductSaleDTO updateProductSale(ProductSaleDTO productSale) {
		ProductSaleEntity productSaleEntity = handleProductSaleSave(productSale);
		return mapper.map(productSaleRepository.save(productSaleEntity), ProductSaleDTO.class);
	}
//Duvida
	private ProductSaleEntity handleProductSaleSave(ProductSaleDTO productSale) {
		ProductSaleEntity productSaleEntity = mapper.map(productSale, ProductSaleEntity.class);
		return productSaleEntity;
	}

	@Transactional
	public void deleteProductSaleById(Long productSaleId) {
		productSaleRepository.findById(productSaleId).ifPresent(productSale -> {
			productSaleRepository.delete(productSale);
			log.debug("Deleted ProductSale: {}", productSale);
		});
	}
}
