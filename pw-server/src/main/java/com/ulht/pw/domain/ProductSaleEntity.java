package com.ulht.pw.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.BatchSize;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ulht.pw.dto.product.ProductDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_sale")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ProductSaleEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

	private int quantitySold;
	private BigDecimal price;
	private BigDecimal taxAmount;
	private LocalDate saleDate;
	
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "product_sale_product", joinColumns = {
			@JoinColumn(name = "product_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "sale_id", referencedColumnName = "id") })
	private Set<ProductEntity> products = new HashSet<>();

}
