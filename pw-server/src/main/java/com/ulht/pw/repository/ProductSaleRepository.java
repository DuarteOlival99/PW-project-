package com.ulht.pw.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ulht.pw.domain.ProductEntity;
import com.ulht.pw.domain.ProductSaleEntity;

@Repository
public interface ProductSaleRepository extends JpaRepository<ProductSaleEntity, Long> {

	Optional<ProductSaleEntity> findById(Long productId);
}
