package com.ulht.pw.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ulht.pw.controller.rest.errors.InvalidCreateException;
import com.ulht.pw.controller.rest.errors.InvalidUpdateException;
import com.ulht.pw.dto.productsale.ProductSaleDTO;
import com.ulht.pw.service.ProductSaleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/productSaleSale")
@RequiredArgsConstructor
public class ProductSaleController {

	private static final String ENTITY_NAME = "productSaleEntity";

	private final ProductSaleService productSaleService;

	@GetMapping("/{id}")
	public ResponseEntity<ProductSaleDTO> searchProductSaleById(@PathVariable(value = "id") Long productSaleId) {
		log.debug("REST request to get productSaleSale with Id : {}", productSaleId);
		return ResponseEntity.ok().body(productSaleService.searchProductSaleById(productSaleId));
	}

	@GetMapping("/list")
	public ResponseEntity<List<ProductSaleDTO>> getAllProductSales() {
		log.debug("REST request to get all productSales");
		return ResponseEntity.ok().body(productSaleService.findAllProductSales());
	}

	@PostMapping("/save")
	public ResponseEntity<ProductSaleDTO> createProductSale(@Valid @RequestBody ProductSaleDTO productSale) throws URISyntaxException {
		log.debug("REST request to save ProductSale : {}", productSale);
		if (!productSale.isNew()) {
			throw new InvalidCreateException(ENTITY_NAME);
		}

		ProductSaleDTO result = productSaleService.createProductSale(productSale);
		return ResponseEntity.created(new URI("/api/productSale/" + result.getId())).body(result);
	}

	@PutMapping("/update")
	public ResponseEntity<ProductSaleDTO> updateProductSale(@Valid @RequestBody ProductSaleDTO productSale) throws URISyntaxException {
		log.debug("REST request to save ProductSaleEntity : {}");
		if (productSale.isNew()) {
			throw new InvalidUpdateException(ENTITY_NAME);
		}

		ProductSaleDTO result = productSaleService.updateProductSale(productSale);
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProductSale(@PathVariable(value = "id") Long id) {
		log.debug("REST request to delete ProductSale : {}", id);
		productSaleService.deleteProductSaleById(id);
		return ResponseEntity.ok().build();
	}

}
