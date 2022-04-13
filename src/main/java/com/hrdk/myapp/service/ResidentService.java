package com.hrdk.myapp.service;

import com.hrdk.myapp.domain.Resident;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Resident}.
 */
public interface ResidentService {
    /**
     * Save a resident.
     *
     * @param resident the entity to save.
     * @return the persisted entity.
     */
    Resident save(Resident resident);

    /**
     * Updates a resident.
     *
     * @param resident the entity to update.
     * @return the persisted entity.
     */
    Resident update(Resident resident);

    /**
     * Partially updates a resident.
     *
     * @param resident the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Resident> partialUpdate(Resident resident);

    /**
     * Get all the residents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Resident> findAll(Pageable pageable);

    /**
     * Get the "id" resident.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Resident> findOne(Long id);

    /**
     * Delete the "id" resident.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
